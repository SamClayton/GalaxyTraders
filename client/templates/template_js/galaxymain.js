// This creates a global template helper
Template.registerHelper('formatNumber', (raw) => {
  return s.numberFormat(raw, 0, ',')
})

Template.registerHelper('formatRamMB', (raw) => {
  return s.numberFormat((raw / 1024 / 1024), 0, ',')
})
