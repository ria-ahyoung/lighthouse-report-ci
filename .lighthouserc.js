module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      startServerCommand: 'yarn start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    }
  },
};
