  //Mock Version History 
  const mockEventHistory =
  [
    {
      component: 'Event',
      title: 'Marius Minea Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime(),
      author: 'Marius Minea',
      id: 1,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 300000,
      author: 'David Fisher',
      id: 2,
    },
    {
      component: 'Event',
      title: 'Marius Minea Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 400000,
      author: 'Marius Minea',
      id: 3,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 500000,
      author: 'David Fisher',
      id: 4,
    },
    {
      component: 'Event',
      title: 'Marius Minea Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 600000,
      author: 'Marius Minea',
      id: 5,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 700000,
      author: 'David Fisher',
      id: 6,
    },
    {
      component: 'Event',
      title: 'Marius Minea Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 800000,
      author: 'Marius Minea',
      id: 7,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 900000,
      author: 'David Fisher',
      id: 8,
    },
  ]

  const mockReflectionHistory = 
  [
    {
      component: 'Event',
      title: 'David Barrington Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime(),
      author: 'David Barrington',
      id: 1,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 2000000,
      author: 'David Fisher',
      id: 2,
    },
  ]

  const mockActionHistory =  
  [
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime(),
      author: 'David Fisher',
      id: 1,
    },
    {
      component: 'Event',
      title: 'Gordan Anderson Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 1000000,
      author: 'Gordan Anderson',
      id: 2,
    },
  ]

const mockUnfinishedScenarioData = {
  id: 1,
  name: 'Unfinished Scenario',
  className: 'CS320',
  authors: [
    "David Fisher",
    "Peter Haas",
    "Lee Osterweil"
  ],
  components: [
    {name: 'Event', history: mockEventHistory, title: 'Sample Title for Event Component', introduction: 'Sample Introduction for Event Component'},
    {name: 'Reflection', history: mockReflectionHistory, title: 'Sample Title for Reflection Component', introduction: 'Sample Introduction for Reflection Component'},
    {name: 'Action', history: mockActionHistory, title: 'Sample Title for Action Component', introduction: 'Sample Introduction for Action Component'},
  ],
  finished: true,
}

const mockFinishedScenarioData = {
  id: 2,
  name: 'Finished Scenario',
  className: 'CS320',
  authors: [
    "David Fisher",
    "Peter Haas",
    "Lee Osterweil"
  ],
  components: [
    {name: 'Event', history: mockEventHistory, title: 'Sample Title for Event Component', introduction: 'Sample Introduction for Event Component'},
    {name: 'Reflection', history: mockReflectionHistory, title: 'Sample Title for Reflection Component', introduction: 'Sample Introduction for Reflection Component'},
    {name: 'Action', history: mockActionHistory, title: 'Sample Title for Action Component', introduction: 'Sample Introduction for Action Component'},
  ],
  finished: false,
}
export { mockUnfinishedScenarioData, mockFinishedScenarioData }