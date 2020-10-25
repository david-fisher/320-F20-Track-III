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
            author: 'David Barrington',
            id: 1,
        },
        {
            type: 'Reflection',
            title: 'David Fisher Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
            date: new Date().getTime() - 2000000,
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
            date: new Date().getTime(),
            author: 'David Fisher',
            id: 1,
        },
        {
            type: 'Action',
            title: 'Gordan Anderson Version Control Introduction',
            body:
                '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
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
                    id: 1,
                    issue: 'Personal Wealth',
                    score: 1,
                },
                {
                    id: 2,
                    issue: 'User Privacy',
                    score: 5,
                },
            ],
        },
    ],
};

const mockUnfinishedScenario = {
    id: 1,
    scenarioName: 'Unfinished Scenario',
    className: 'CS320',
    authors: ['David Fisher', 'Peter Haas', 'Lee Osterweil'],
    finished: true,
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

const mockUnfinishedScenarioData = {
    id: 1,
    authors: ['David Fisher', 'Peter Haas', 'Lee Osterweil'],
    components: [
        mockGenericComponent,
        mockReflectionComponent,
        mockActionComponent,
    ],
    finished: true,
};

const mockFinishedScenario = {
    id: 2,
    scenarioName: 'Finished Scenario',
    className: 'CS320',
    authors: ['David Fisher', 'Peter Haas', 'Lee Osterweil'],
    finished: false,
};

const mockFinishedScenarioData = {
    id: 2,
    authors: ['David Fisher', 'Peter Haas', 'Lee Osterweil'],
    components: [
        mockGenericComponent,
        mockReflectionComponent,
        mockActionComponent,
    ],
    finished: false,
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
};
