/* Decision tool logic — AI-Resilient Assessment Kit (MIT license).
   Reads questions.json, renders fieldsets, computes recommendations.
   Accessibility contract:
   - every question is a <fieldset> with a <legend>;
   - radio inputs are the only interaction; keyboard-first;
   - on the FIRST results reveal, focus moves to the results heading
     (tabindex="-1"); on recomputes (an answer changed after results are
     visible) focus stays where the user is and the polite live region
     announces the update instead;
   - Back removes the most recent answer and returns focus to it;
   - Start over resets and returns focus to the first question;
   - unanswered questions on submit: focus moves to the first one;
   - results carry a low-confidence warning when the top-ranked approach
     scores <= 2 (the answers point in different directions);
   - no network calls except the initial questions.json fetch; nothing stored. */
(function () {
  "use strict";

  var form = document.getElementById("tool-form");
  var resultsSection = document.getElementById("results");
  var resultsHeading = document.getElementById("results-heading");
  var resultsList = document.getElementById("results-list");
  var status = document.getElementById("status");
  var btnBack = document.getElementById("btn-back");
  var btnRestart = document.getElementById("btn-restart");
  var btnSubmit = document.getElementById("btn-submit");

  var data = null;
  var answerOrder = []; // question ids in answer order
  var resultsShown = false; // focus moves to the heading on the first reveal only

  fetch("questions.json")
    .then(function (res) { return res.json(); })
    .then(function (json) { data = json; render(json); })
    .catch(function () {
      form.innerHTML = "<p class=\"error-msg\">Could not load the questions. The plain-language comparison of all eight approaches is available without this tool: <a href=\"../approaches.html\">Eight approaches compared</a>.</p>";
    });

  function render(data) {
    var html = "";
    data.questions.forEach(function (q, i) {
      html += "<fieldset id=\"fs-" + q.id + "\">";
      html += "<legend>" + q.legend + "</legend>";
      html += "<p class=\"hint\" id=\"hint-" + q.id + "\">" + q.hint + "</p>";
      q.options.forEach(function (opt, j) {
        var id = q.id + "-" + j;
        html += "<div class=\"choice\">";
        html += "<input type=\"radio\" id=\"" + id + "\" name=\"" + q.id + "\" value=\"" + opt.value + "\" aria-describedby=\"hint-" + q.id + "\">";
        html += "<label for=\"" + id + "\">" + opt.label + "</label>";
        html += "</div>";
      });
      html += "</fieldset>";
    });
    form.innerHTML = html;

    form.addEventListener("change", function (e) {
      if (e.target && e.target.name) {
        var qid = e.target.name;
        if (answerOrder.indexOf(qid) === -1) answerOrder.push(qid);
        updateControls();
        status.textContent = "Answered " + answerOrder.length + " of " + data.questions.length + " questions.";
        if (answerOrder.length === data.questions.length) {
          showResults();
        }
      }
    });

    updateControls();
  }

  function updateControls() {
    btnBack.disabled = answerOrder.length === 0;
    btnRestart.disabled = answerOrder.length === 0 && resultsSection.hidden;
  }

  function clearError() {
    var old = document.getElementById("tool-error");
    if (old) old.remove();
  }

  function showResults() {
    clearError();
    var answers = {};
    data.questions.forEach(function (q) {
      var checked = form.querySelector("input[name=\"" + q.id + "\"]:checked");
      if (checked) answers[q.id] = checked.value;
    });

    var scores = {};
    var whys = {};
    data.rules.forEach(function (rule) {
      var matches = Object.keys(rule.when).every(function (qid) {
        return rule.when[qid].indexOf(answers[qid]) !== -1;
      });
      if (matches) {
        scores[rule.approach] = (scores[rule.approach] || 0) + rule.weight;
        if (!whys[rule.approach]) whys[rule.approach] = [];
        whys[rule.approach].push(rule.why);
      }
    });

    // Drop negative-scoring approaches, rank the rest, take top 3.
    var ranked = Object.keys(scores)
      .filter(function (a) { return scores[a] > 0; })
      .sort(function (a, b) { return scores[b] - scores[a]; })
      .slice(0, 3);
    var lowConfidence = ranked.length > 0 && scores[ranked[0]] <= 2;

    resultsList.innerHTML = "";
    if (!ranked.length) {
      // Defensive only: with the current rule set every one of the 972
      // answer combinations produces at least one recommendation.
      resultsList.innerHTML = "<p class=\"error-msg\">No recommendation fired for this combination — that is unexpected. The honest next step is reading the <a href=\"../approaches.html\">full comparison</a> and the <a href=\"../principles.html\">principles</a>, then talking it through with a colleague.</p>";
    } else {
      if (lowConfidence) {
        var warn = document.createElement("p");
        warn.className = "warn";
        warn.textContent = "Low confidence: these answers point in different directions, and no approach matches them strongly. Treat the cards below as starting points to argue with — and lean on the reasoning, not the ranking.";
        resultsList.appendChild(warn);
      }
      ranked.forEach(function (key) {
        var a = data.approaches[key];
        var card = document.createElement("article");
        card.className = "card";
        var h = document.createElement("h3");
        h.textContent = a.name;
        card.appendChild(h);
        var d = document.createElement("p");
        d.className = "desc";
        d.textContent = a.desc;
        card.appendChild(d);
        var whyBox = document.createElement("div");
        whyBox.className = "why";
        var whyH = document.createElement("h4");
        whyH.textContent = "Why this recommendation?";
        whyBox.appendChild(whyH);
        var ul = document.createElement("ul");
        whys[key].forEach(function (w) {
          var li = document.createElement("li");
          li.textContent = w;
          ul.appendChild(li);
        });
        whyBox.appendChild(ul);
        card.appendChild(whyBox);
        var links = document.createElement("p");
        a.links.forEach(function (l, i) {
          var link = document.createElement("a");
          link.href = l.href;
          link.textContent = l.label;
          links.appendChild(link);
          if (i < a.links.length - 1) links.appendChild(document.createTextNode(" · "));
        });
        card.appendChild(links);
        resultsList.appendChild(card);
      });

      var always = document.createElement("p");
      always.textContent = data.alwaysAdd.note;
      resultsList.appendChild(always);
    }

    resultsSection.hidden = false;
    // First reveal: move focus to the results heading. Recomputes (an answer
    // changed while results are visible): focus stays with the control the
    // user just operated, and the live region announces the update.
    if (!resultsShown) {
      resultsShown = true;
      status.textContent = "Results ready: " + ranked.length + " recommended approach" + (ranked.length === 1 ? "" : "es") + " shown below." + (lowConfidence ? " Low confidence — see the warning above the cards." : "");
      resultsHeading.focus();
    } else {
      status.textContent = "Results updated: still " + ranked.length + " recommended approach" + (ranked.length === 1 ? "" : "es") + " shown below." + (lowConfidence ? " Low confidence — see the warning above the cards." : "");
    }
    btnRestart.disabled = false;
  }

  btnSubmit.addEventListener("click", function () {
    if (!data) return;
    var missing = data.questions.filter(function (q) {
      return !form.querySelector("input[name=\"" + q.id + "\"]:checked");
    });
    if (missing.length) {
      clearError();
      var err = document.createElement("p");
      err.className = "error-msg";
      err.id = "tool-error";
      err.setAttribute("role", "alert");
      err.textContent = "Please answer " + missing.length + " more question" + (missing.length > 1 ? "s" : "") + ". The first one is now in view.";
      form.parentNode.insertBefore(err, form);
      var first = document.getElementById("fs-" + missing[0].id);
      first.scrollIntoView({ block: "start" });
      var radio = first.querySelector("input");
      radio.focus();
      status.textContent = missing.length + " questions still need answers.";
      return;
    }
    showResults();
  });

  btnBack.addEventListener("click", function () {
    if (!answerOrder.length) return;
    resultsSection.hidden = true;
    resultsShown = false; // a fresh full run should re-focus the heading
    var last = answerOrder.pop();
    var checked = form.querySelector("input[name=\"" + last + "\"]:checked");
    if (checked) checked.checked = false;
    clearError();
    updateControls();
    var firstRadio = form.querySelector("input[name=\"" + last + "\"]");
    if (firstRadio) firstRadio.focus();
    status.textContent = "Cleared the previous answer. " + answerOrder.length + " of " + data.questions.length + " answered.";
  });

  btnRestart.addEventListener("click", function () {
    form.querySelectorAll("input[type=\"radio\"]").forEach(function (r) { r.checked = false; });
    answerOrder = [];
    resultsSection.hidden = true;
    resultsList.innerHTML = "";
    resultsShown = false;
    clearError();
    updateControls();
    var firstRadio = form.querySelector("input[type=\"radio\"]");
    if (firstRadio) firstRadio.focus();
    status.textContent = "Started over. All answers cleared.";
  });
})();
