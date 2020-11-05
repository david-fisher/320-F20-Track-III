//Mock Version History
const mockGenericHistory = {
    type: 'Generic',
    history: [
        {
            type: 'Generic',
            title: 'Marius Minea Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime(),
            author: 'Marius Minea',
            id: 1,
        },
        {
            type: 'Generic',
            title: 'David Fisher Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 300000,
            author: 'David Fisher',
            id: 2,
        },
        {
            type: 'Generic',
            title: 'Marius Minea Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 400000,
            author: 'Marius Minea',
            id: 3,
        },
        {
            type: 'Generic',
            title: 'David Fisher Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 500000,
            author: 'David Fisher',
            id: 4,
        },
        {
            type: 'Generic',
            title: 'Marius Minea Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 600000,
            author: 'Marius Minea',
            id: 5,
        },
        {
            type: 'Generic',
            title: 'David Fisher Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 700000,
            author: 'David Fisher',
            id: 6,
        },
        {
            type: 'Generic',
            title: 'Marius Minea Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 800000,
            author: 'Marius Minea',
            id: 7,
        },
        {
            type: 'Generic',
            title: 'David Fisher Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 900000,
            author: 'David Fisher',
            id: 8,
        },
    ],
};

const mockReflectionHistory = {
    type: 'Reflection',
    history: [
        {
            type: 'Reflection',
            title: 'David Barrington Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime(),
            questions: ['How do you feel?', 'Do you like this?'],
            author: 'David Barrington',
            id: 1,
        },
        {
            type: 'Reflection',
            title: 'David Fisher Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 2000000,
            questions: ['How do you feel?', 'Do you like this?'],
            author: 'David Fisher',
            id: 2,
        },
    ],
};

const mockActionHistory = {
    type: 'Action',
    history: [
        {
            type: 'Action',
            title: 'David Fisher Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
            option1: 'Go Ahead',
            option2: 'Wait',
            date: new Date().getTime(),
            author: 'David Fisher',
            id: 1,
        },
        {
            type: 'Action',
            title: 'Gordan Anderson Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
            option1: 'Die',
            option2: 'Live',
            date: new Date().getTime() - 1000000,
            author: 'Gordan Anderson',
            id: 2,
        },
    ],
};

const mockIssuesHistory = {
    type: 'Issues',
    history: [
        {
            date: new Date().getTime(),
            author: 'Marius Minea',
            id: 1,
            issues: [
                {
                    ISSUE_ID: 1,
                    NAME: 'Personal Wealth',
                    IMPORTANCE_SCORE: 1,
                    SCENARIO_ID: 1,
                    VERSION_ID: 2,
                },
                {
                    ISSUE_ID: 2,
                    NAME: 'User Privacy',
                    IMPORTANCE_SCORE: 5,
                    SCENARIO_ID: 1,
                    VERSION_ID: 2,
                },
                {
                    ISSUE_ID: 3,
                    NAME: 'Career Building Opportunity',
                    IMPORTANCE_SCORE: 2,
                    SCENARIO_ID: 1,
                    VERSION_ID: 2,
                },
                {
                    ISSUE_ID: 4,
                    NAME: 'Project Harms Career',
                    IMPORTANCE_SCORE: 2,
                    SCENARIO_ID: 1,
                    VERSION_ID: 2,
                },
                {
                    ISSUE_ID: 5,
                    NAME: 'Short Term Company Profits',
                    IMPORTANCE_SCORE: 2,
                    SCENARIO_ID: 1,
                    VERSION_ID: 2,
                },
                {
                    ISSUE_ID: 6,
                    NAME: 'Long Term Company Profits',
                    IMPORTANCE_SCORE: 2,
                    SCENARIO_ID: 1,
                    VERSION_ID: 2,
                },
                {
                    ISSUE_ID: 7,
                    NAME: 'User Health Improvement',
                    IMPORTANCE_SCORE: 2,
                    SCENARIO_ID: 1,
                    VERSION_ID: 2,
                },
            ],
        },
    ],
};

const mockConversationEditorHistory = {
    history: [
        {
            date: new Date().getTime(),
            author: 'Marius Minea',
            id: 1,
            stakeholders: [
                {
                    id: 1,
                    name: 'Da Big Cheeze',
                    bio: 'Spiffy',
                    mainConvo: 'Big Spiffy',
                    questionsResponses: [
                        {
                            question: 'Do you like this idea?',
                            response: "Yes, I love stealing everyone's data",
                        },
                        {
                            question: 'Do you like this idea?',
                            response: "Yes, I love stealing everyone's data",
                        },
                    ],
                    stakeHolderIssues: [
                        {
                            id: 1,
                            issue: 'Personal Wealth',
                            stakeHolderScore: 3,
                        },
                        {
                            id: 2,
                            issue: 'Privacy',
                            stakeHolderScore: 4,
                        },
                    ],
                },
            ],
        },
    ],
};

const mockGenericComponent = {
    type: 'Generic',
    id: 3,
    title: 'Introduction',
    body: 'Sample Introduction for Generic Component',
};

const mockReflectionComponent = {
    type: 'Reflection',
    id: 4,
    title: 'Initial Reflection',
    body: 'Sample Introduction for Reflection Component',
};

const mockActionComponent = {
    type: 'Action',
    id: 5,
    title: 'Initial Action',
    body: 'Sample Introduction for Action Component',
};

const mockUnfinishedScenario = {
    id: 1,
    scenarioName: 'Unfinished Scenario',
    className: 'CS320',
    authors: ['David Fisher', 'Peter Haas', 'Lee Osterweil'],
    finished: false,
};

const mockUnfinishedScenarioData = {
    id: 1,
    authors: ['David Fisher', 'Peter Haas', 'Lee Osterweil'],
    components: [
        mockGenericComponent,
        mockReflectionComponent,
        mockActionComponent,
    ],
    finished: false,
};

const mockFinishedScenario = {
    id: 2,
    scenarioName: 'Finished Scenario',
    className: 'CS320',
    authors: ['David Fisher', 'Peter Haas', 'Lee Osterweil'],
    finished: true,
};

const mockFinishedScenarioData = {
    id: 2,
    authors: ['David Fisher', 'Peter Haas', 'Lee Osterweil'],
    components: [
        mockGenericComponent,
        mockReflectionComponent,
        mockActionComponent,
    ],
    finished: true,
};

export {
    mockUnfinishedScenarioData,
    mockFinishedScenarioData,
    mockUnfinishedScenario,
    mockFinishedScenario,
    mockActionHistory,
    mockGenericHistory,
    mockReflectionHistory,
    mockIssuesHistory,
    mockGenericComponent,
    mockActionComponent,
    mockReflectionComponent,
    mockConversationEditorHistory,
};
