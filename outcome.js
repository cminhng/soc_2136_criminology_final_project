const savedState = localStorage.getItem("lifeState");
const state = savedState ? JSON.parse(savedState) : null;
console.log("Final state:", state);

const outcomeDescriptions = {
  "Conventional/Stabilized Life": {
    title: "conventional conformist",
    summary: "strong bonds + low strain",
    description: "Congrats. You’ve built supportive relationships, invested in your future, and navigated life challenges.",
    earlyOffendingFalse: "You stayed out of trouble in your youth. Good job.",
    earlyOffendingTrue: "Even though you briefly dipped your toes into delinquency in your youth, you're on the right track and your bonds will help you stay on the right side of the law."
  },
  "Stressed Achiever / Tense Conformist": {
    title: "tense conformist",
    summary: "strong bonds + high strain",
    description: "You’ve built strong bonds that keep you mostly lawful, but ongoing strain causes conflict, minor deviance, or emotional stress.",
    earlyOffendingTrue: "In your youth, you engaged in a few deviant activities to cope, but now you are a rule-following adult."
  },
  "Forming Bonds / Low Stress": {
    title: "unbothered",
    summary: "weak bonds + low strain",
    description: "You haven't really formed strong bonds but you haven't severed them either. It just doesn't seem to be high on your priority list.",
    earlyOffendingFalse: "You got into trouble as an adolescent, and you may or may not continue to engage in minor delinquency.",
    earlyOffendingTrue: "You stayed out of trouble in your youth, and may or may not engage in minor delinquency as an adult."
  },
  "Struggling / High Stress": {
    title: "struggling",
    summary: "weak bonds + high strain",
    description: "You are struggling to form bonds and are stressed about it.",
    earlyOffendingFalse: "You haven’t broken the law yet, but if you are still unable to form bonds, you may snap one day.",
    earlyOffendingTrue: "You engaged in some minor deviant activity to cope as a youth. If you continually are unable to form bonds to cope with your stress, you may continue on this criminal path in adulthood."
  },
  "Marginal / Drift": {
    title: "detached",
    summary: "weak bonds + low strain",
    description: "You never managed to make strong bonds throughout your life, and you don't care. Life is unstable and disengaged.",
    earlyOffendingFalse: "You stayed out of trouble in your youth, but who knows? You may or may not commit crimes later on.",
    earlyOffendingTrue: "You were a bit deviant in your youth. You might keep breaking rules here and there."
  },
  "Antisocial/Criminal + Late Onset": {
    title: "i hate to break it to you...",
    summary: "weak bonds + high strain",
    description: "You failed to develop strong bonds. You never stepped outside the law, but you are strained. You may eventually engage in criminal behaviors because you lack positive coping methods and a support system.",
    earlyOffendingFalse: ""
  },
  "Antisocial/Criminal + Desisted": {
    title: "reformed delinquent",
    summary: "weak bonds + high strain",
    description: "You chose to engage in anti-social behaviors throughout your development. You committed minor crimes and broke the rules to cope, but you’ve decided you don’t want this for the rest of your life. It will not be easy, but do your best from now on.",
    earlyOffendingTrue: ""
  },
  "Antisocial/Criminal + Persisted": {
    title: "antisocial criminal",
    summary: "weak bonds + high strain",
    description: "You chose to engage in anti-social and criminal activities until the end."
  }
};

function calculateOutcome(state) {
    if (!state) return "No state found.";

    const bonds = state.attachment + state.belief + state.involvement + state.commitment;
    const strain = state.strain;

    if (state.persisted) {
        return "Antisocial/Criminal + Persisted";
    }

    if (bonds >= 5 && strain <= 1) {
        return "Conventional/Stabilized Life";
    } else if (bonds >= 5 && strain > 1) {
        return "Stressed Achiever / Tense Conformist";
    } else if (bonds >= 1 && bonds <= 4 && strain <= 1) {
        return "Forming Bonds / Low Stress";
    } else if (bonds >= 1 && bonds <= 4 && strain > 1) {
        return "Struggling / High Stress";
    } else if (bonds < 1 && strain <= 1) {
        return "Marginal / Drift";
    } else if (bonds < 1 && strain > 1){
        return state.earlyOffending ? 
            "Antisocial/Criminal + Desisted" : "Antisocial/Criminal + Late Onset";
    }

    return "Outcome Undefined";
}

function displayOutcome(state) {
    const outcomeKey = calculateOutcome(state);
    const outcome = outcomeDescriptions[outcomeKey];
    if (!outcome) return;

    const outcomeContent = document.getElementById("outcome_content");
    if (!outcomeContent) return;

    outcomeContent.innerHTML = ""; // clear previous

    const title = document.createElement("p");
    title.classList.add("outcome_header");
    title.textContent = outcome.title;
    outcomeContent.appendChild(title);

    const summary = document.createElement("p");
    summary.classList.add("outcome_summary");
    summary.textContent = outcome.summary;
    outcomeContent.appendChild(summary);

    const desc = document.createElement("p");
    desc.classList.add("outcome_text");
    desc.textContent = outcome.description;
    outcomeContent.appendChild(desc);

    // if (state.persisted && outcomeKey === "Antisocial/Criminal + Persisted") {
    //     const extra = document.createElement("p");
    //     extra.textContent = "You persisted with anti-social behaviors until the end of your development.";
    //     outcomeContent.appendChild(extra);
    // } else 
    if (state.earlyOffending && outcome.earlyOffendingTrue) {
        const extra = document.createElement("p");
        extra.classList.add("outcome_text");
        extra.textContent = outcome.earlyOffendingTrue;
        outcomeContent.appendChild(extra);
    } else if (!state.earlyOffending && outcome.earlyOffendingFalse) {
        const extra = document.createElement("p");
        extra.classList.add("outcome_text");
        extra.textContent = outcome.earlyOffendingFalse;
        outcomeContent.appendChild(extra);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (!state) {
        document.getElementById("outcome_content").textContent = "No saved state.";
        return;
    }
    displayOutcome(state);
});
