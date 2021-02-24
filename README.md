# Advanced Initiative Tracker
A better way to track initiative when playing Rifts RPG, or any game that has multiple attacks in a single round of combat
## Version 2
Built using [Svelte](https://svelte.dev/) and [Svelte Materialify](https://svelte-materialify.vercel.app/getting-started/installation/)
## Demo
[Advanced Initiative Tracker v2](http://adv-init-tracker.s3-website.us-east-2.amazonaws.com/). Currently has dummy data for demo and testing.

### New Features
- [x] Add rounds - dynamically add rounds to the table
- [x] Auto add rounds with new character - if the new character's initiative is greater than the table's rounds
- [x] Negative rounds - a character with three attacks and an initiative of 1 will create negative rounds on the table so they don't lose attacks
- [x] Vertical layout - the table can switch to a vertical layout for mobile devices. Names and round numbers with switch axis
- [x] Sticky headers - table headers stick when scrolling
- [x] Keyboard controls - arrows left and right. More to come.
- [x] Auto switch layouts for responsive breakpoints
- [ ] Name Chip component - reveals additional details for mobs
- [ ] Update Mob Initiative - from Name Chip
- [ ] Remove Mob - from Name Chip
- [ ] Update Mob attacks - from Name Chip
- [ ] Add dice roller - quick roll initiative
- [ ] Add 3D dice roller - let's get fancy
- [ ] Save data - save everything to local browser storage
- [ ] Favorite List - add way to mark mobs as favorite
- [ ] Duplicate Mobs - rename to "mob (1)" and "mob (2)"
- [ ] Rearrange Rows - Drag and Drop or some other method to manually sort the rows
- [ ] Dark mode theme
- [ ] Custom background image
- [ ] Add icons - instead of "x"
- [ ] Mark turns as taken - toggle icons
- [ ] Initiative bonus - from Name Chip
- [ ] Condition Icons
- [ ] Grouping - or row colorizing
- [ ] Table Reset
- [ ] Multiple sessions - from local storage or Firebase login
- [ ] Custom stat trackers - added to all Name Chips for things like HP or ammo

