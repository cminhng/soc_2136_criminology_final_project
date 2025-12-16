console.log("play.js loaded");

const defaultState = {
  attachment: 0,
  belief: 0,
  involvement: 0,
  commitment: 0,
  strain: 0,
  earlyOffending: false
};

let state = { ...defaultState };

function resetState() {
  state = { ...defaultState };
}

const gameContent = document.querySelector(".game_content");

let currentStage = null;
let currentStepIndex = 0;
let awaitingChoice = false;


const stage1 = [
    { type: "header", content: "CHILDHOOD" },
    { type: "text", content: "ACT I — a silent home." },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
    { type: "image", src: "./static/images/soc2136_final_title.png" },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
    { type: "image", src: "./static/images/soc2136_final_title.png" },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
    { type: "image", src: "./static/images/soc2136_final_title.png" },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
    { type: "text", content: "[???]: Hello!" },
    { type: "image", src: "./static/images/soc2136_final_title.png" },
    { type: "choice",
        content: " ",
        choices: [
            {
                label: "Take it.",
                effect: function () {
                    state.attachment += 1;
                    state.belief += 1;
                    state.strain -= 3;
                    // insertSteps([
                    // { type: "image", src: "./static/images/soc2136_final_def.png" },
                    // { type: "text", content: "For a moment, you feel seen." }
                    // ]);
                }
            },
            {
                label: "Turn away.",
                effect: function () {
                    state.attachment -= 1;
                    state.belief -= 1;
                    state.strain += 1;
                }
            }
        ]
    }
];

const stage2 = [
    { type: "header", content: "EARLY ADOLESCENCE" },
    { type: "text", content: "ACT II — at school." },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
    { type: "choice",
        content: "Will you join in?",
        choices: [
            {
                label: "Yes.",
                effect: function () {
                    state.involvement += 1;
                    state.attachment += 1;
                    state.strain -= 2;
                }
            },
            {
                label: "No.",
                effect: function () {
                    //this is the band
                    insertSteps([
                    { type: "image", src: "./static/images/soc2136_final_title.png" },
                    { type: "choice", 
                        content: "Will you join in?",
                        choices: [
                            {
                                label: "Yes.",
                                effect: function () {
                                    state.involvement += 1;
                                    state.attachment += 1;
                                    state.strain -= 2;
                                }
                            },
                            {
                                label: "No.",
                                effect: function () {
                                    //this is the library
                                    insertSteps([ 
                                        { type: "image", src: "./static/images/soc2136_final_title.png" },
                                        { type: "image", src: "./static/images/soc2136_final_def.png" },
                                        { type: "choice", 
                                            content: "",
                                            choices: [
                                                {
                                                    label: "Take it.",
                                                    effect: function () {
                                                        state.involvement += 1;
                                                        state.attachment += 1;
                                                        state.strain -= 2;
                                                    }
                                                },
                                                {
                                                    label: "Don't take it.",
                                                    effect: function () {
                                                        state.involvement -= 1;
                                                        state.strain += 1;
                                                        insertSteps([
                                                            { type: "image", src: "./static/images/soc2136_final_title.png" },
                                                        ]);
                                                    }
                                                },
                                            ]
                                        }
                                    ]);
                                }
                            },
                        ]
                    }
                    ]);
                }
            }
        ]
    },
];

const stage3 = [
    { type: "header", content: "LATE ADOLESCENCE" },
    { type: "text", content: "ACT III — what will you do and who will you be?" },
    { type: "choice",
        content: "Are you going to class?",
        choices: [
            {
                label: "Skip class.",
                effect: function () {
                    state.commitment -= 4;
                    state.involvement -= 2;
                    state.strain += 3;
                    insertSteps([
                        { type: "image", src: "./static/images/soc2136_final_def.png" },
                    ]);
                }
            },
            {
                label: "Go to class.",
                effect: function () {
                    insertSteps([ 
                        { type: "choice", 
                            content: "Are you paying attention?",
                            choices: [
                                {
                                    label: "Nah.",
                                    effect: function () {
                                        state.commitment -= 1;
                                        state.strain += 1;
                                        insertSteps([
                                            { type: "image", src: "./static/images/soc2136_final_def.png" },
                                        ]);
                                    }
                                },
                                {
                                    label: "Yeah.",
                                    effect: function () {
                                        state.commitment += 1;
                                        state.strain -= 1;
                                        insertSteps([
                                            { type: "image", src: "./static/images/soc2136_final_title.png" },
                                        ]);
                                    }
                                },
                            ]
                        },
                        { type: "choice", 
                            content: "Do your homework.",
                            choices: [
                                {
                                    label: "No.",
                                    effect: function () {
                                        state.commitment -= 1;
                                        state.involvement -= 1;
                                        insertSteps([
                                            { type: "image", src: "./static/images/soc2136_final_def.png" },
                                        ]);
                                    }
                                },
                                {
                                    label: "Okay.",
                                    effect: function () {
                                        state.commitment += 1;
                                        state.attachment += 1;
                                        state.involvement += 1;
                                        state.strain -= 1;
                                        insertSteps([
                                            { type: "image", src: "./static/images/soc2136_final_title.png" },
                                        ]);
                                    }
                                },
                            ]
                        }
                    ]);
                }
            }
        ]
    },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
    { type: "image", src: "./static/images/soc2136_final_title.png" },
    { type: "choice",
        content: " ",
        choices: [
            {
                label: "Go over there.",
                effect: function () {
                    insertSteps([
                        { type: "image", src: "./static/images/soc2136_final_def.png" },
                        { type: "choice", 
                            content: " ",
                            choices: [
                                {
                                    label: "Join them.",
                                    effect: function () {
                                        state.earlyOffending = true;
                                        state.commitment -= 1;
                                        state.belief -= 1;
                                        state.strain -=2;
                                        insertSteps([
                                            { type: "image", src: "./static/images/soc2136_final_title.png" },
                                            { type: "choice", 
                                                content: "Have you had enough?",
                                                choices: [
                                                    {
                                                        label: "No!",
                                                        effect: function () {
                                                            state.belief -= 3;
                                                            insertSteps([
                                                                { type: "image", src: "./static/images/soc2136_final_def.png" },
                                                            ]);
                                                        }
                                                    },
                                                    {
                                                        label: "Yeah.",
                                                        effect: function () {
                                                            //nothing
                                                        }
                                                    },
                                                ]
                                            }
                                        ]);
                                    }
                                },
                                {
                                    label: "Leave.",
                                    effect: function () {
                                        state.belief += 1;
                                        insertSteps([
                                            { type: "image", src: "./static/images/soc2136_final_title.png" },
                                        ]);
                                    }
                                },
                            ]
                        }
                    ]);
                }
            },
            {
                label: "Mind your own business.",
                effect: function () {
                    state.belief += 1;
                    insertSteps([
                        { type: "image", src: "./static/images/soc2136_final_title.png" },
                    ]);
                }
            }
        ]
    },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
    { type: "image", src: "./static/images/soc2136_final_title.png" },
    { type: "choice",
        content: "[School counselor]: What do you want to be when you grow up?",
        choices: [
            {
                label: "I don't know.",
                effect: function () {
                    insertSteps([
                        { type: "text", content: "That's okay." }
                    ]);
                }
            },
            {
                label: "I don't care.",
                effect: function () {
                    state.commitment -= 12;
                    state.belief -= 1;
                }
            },
            {
                label: "Someone.",
                effect: function () {
                    state.belief += 1;
                }
            },
            {
                label: "No one.",
                effect: function () {
                    state.commitment -= 1;
                    state.belief -= 1;
                }
            },
            {
                label: "[insert legitimate career here].",
                effect: function () {
                    state.commitment += 1;
                    state.belief += 2;
                }
            },
            {
                label: "A murderer.",
                effect: function () {
                    state.attachment -= 1;
                    state.belief -= 4;
                }
            }
        ]
    },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
];

const stage4 = [
    { type: "header", content: "EARLY ADULTHOOD" },
    { type: "text", content: "ACT IV — look, it's not too late for anything." },
    { type: "image", src: "./static/images/soc2136_final_def.png" },
    { type: "choice",
        content: "You've crossed the law once.",
        condition: () => state.earlyOffending === true,
        choices: [
            {
                label: "(Desist) I'll straighten out now.",
                effect: function () {
                    state.belief += 3;
                    state.strain -= 2;
                }
            },
            {
                label: "(Persist) It's too late to go back.",
                effect: function () {
                    insertSteps([
                        { type: "choice",
                            content: "So be it.",
                            choices: [
                                {
                                    label: "It's over.",
                                    effect: function () {
                                        endGame();
                                    }
                                }
                            ]
                        }
                    ]);
                }
            }
        ]
    },
    { type: "choice",
        content: "Will you find a job?",
        choices: [
            {
                label: "I'll try.",
                effect: function () {
                    state.commitment += 2;
                    insertSteps([
                        { type: "choice",
                            content: "Accept your coworkers' invite to lunch?",
                            choices: [
                                {
                                    label: "Yes.",
                                    effect: function () {
                                        state.strain -= 2;
                                    }
                                },
                                {
                                    label: "No.",
                                    effect: function () {
                                        state.strain += 1;
                                    }
                                },
                            ]
                        }
                    ]);
                }
            },
            {
                label: "I won't.",
                effect: function () {
                    state.commitment -= 2;
                }
            }
        ]
    },
    { type: "choice",
        content: "It's the weekend.",
        choices: [
            {
                label: "Do something.",
                effect: function () {
                    insertSteps([
                        { type: "choice",
                            content: " ",
                            choices: [
                                {
                                    label: "Chat with a stranger.",
                                    effect: function () {
                                        state.strain -= 1;
                                        state.commitment += 2;
                                    }
                                },
                                {
                                    label: "Take a pilates class.",
                                    effect: function () {
                                        state.strain -= 1;
                                        state.commitment += 2;
                                    }
                                },
                                {
                                    label: "Join a book club.",
                                    effect: function () {
                                        state.strain -= 1;
                                        state.commitment += 2;
                                    }
                                },
                                {
                                    label: "Enter a karaoke competition.",
                                    effect: function () {
                                        state.strain -= 1;
                                        state.commitment += 2;
                                    }
                                },
                            ]
                        }
                    ]);
                }
            },
            {
                label: "Do nothing.",
                effect: function () {
                    state.commitment -= 1;
                    state.involvement -=1;
                    state.strain +=2;
                }
            }
        ]
    },
    { type: "choice",
        content: "Congrats. You've reached the end.",
        choices: [
            {
                label: "See who you've become.",
                effect: function () {
                    endGame();
                }
            }
        ]
    },
];

let stages = [stage1, stage2, stage3, stage4];
let currentStageIndex = 0;

function clearContent() {
  gameContent.innerHTML = "";
}

function renderStep() {
    clearContent();
    awaitingChoice = false;

    const step = currentStage[currentStepIndex];

    if (step.condition && !step.condition()) {
        currentStepIndex += 1;
        renderStep();
        return;
    }

    if (!step) {
        const p = document.createElement("p");
        p.classList.add("game_p");
        p.textContent = "End of Stage 1.";
        gameContent.appendChild(p);
        return;
    }

    if (step.type === "text") {
        const p = document.createElement("p");
        p.classList.add("game_p");
        p.textContent = step.content;
        gameContent.appendChild(p);
    }

    else if (step.type === "header") {
        const p = document.createElement("p");
        p.classList.add("game_header");
        p.textContent = step.content;
        gameContent.appendChild(p);
    }

    else if (step.type === "image") {
        const img = document.createElement("img");
        img.classList.add("img");
        img.src = step.src;
        gameContent.appendChild(img);
    }

    else if (step.type === "choice") {
        awaitingChoice = true;

        const p = document.createElement("p");
        p.classList.add("game_p");
        p.textContent = step.content;
        gameContent.appendChild(p);

        step.choices.forEach(function (choice) {
            const btn = document.createElement("button");
            btn.classList.add("game_text_button");
            btn.textContent = choice.label;

            btn.onclick = function (e) {
            e.stopPropagation();

            choice.effect();

            // earlyOffending can only flip once
            if (choice.setEarlyOffending && !state.earlyOffending) {
                state.earlyOffending = true;
            }

            advance();
            };

            gameContent.appendChild(btn);
        });
    }
}

function advance() {
    if (currentStageIndex >= stages.length || currentStepIndex >= stages[currentStageIndex].length) {
        endGame();
        return;
    }
    
    currentStepIndex += 1;

    if (currentStepIndex >= stages[currentStageIndex].length) {
        currentStageIndex += 1;
        if (currentStageIndex >= stages.length) {
            console.log("End of all stages. Current state:", state);
            return;
        }
        startStage(stages[currentStageIndex]);
        return;
    }

    renderStep();
}

function insertSteps(steps) {
  currentStage.splice(currentStepIndex + 1, 0, ...steps);
}

gameContent.addEventListener("click", function () {
  if (!awaitingChoice) {
    advance();
  }
});

function endGame(){
    console.log("Game over. Final state:", state);
    localStorage.setItem("lifeState", JSON.stringify(state));
    window.location.href = "outcome.html";
}


function startStage(stage) {
  currentStage = stage;
  currentStepIndex = 0;
  renderStep();
}

resetState();
startStage(stage1);


// function loadState() {
//   const saved = localStorage.getItem("lifeState");
//   return saved ? JSON.parse(saved) : { ...defaultState };
// }

// function saveState(state) {
//   localStorage.setItem("lifeState", JSON.stringify(state));
// }

// let state = loadState();

// function endGame() {
//   saveState(state);
//   window.location.href = "outcomes.html";
// }