function validatePost(todos) {
  let valid = true;
  valid = valid && todos.title.length > 0;
  valid = valid && todos.description.length > 0;
  valid = valid && todos.deadline > /^\d{4}-\d{2}-\d{2}$/; // https://stackoverflow.com/a/18759013

  return valid;
}

module.exports = {
  validatePost,
};

/* Hej Jesper, hoppas allt är bra med dig!

Jag heter Tobias Larsson och studerar just nu till front end utvecklare på
medieinstitutet YH i Stockholm (https://medieinstitutet.se/utbildningar/front-end-developer/).

Till hösten ska jag ut på min första LIA(praktik) period och undrar om det finns någon jag skulle kunna höra av mig till angående ansökan hos er på Frank?

Hittade er på linkedin och från det jag sett verkar ni ha väldigt kul, en bra sammanhållning och det känns som att alla uppskattas.
Det känns som en miljö som bidrar mycket till att utvecklas.

Jag bifogar mitt CV och hoppas vi hörs vidare!

Trevlig helg!

Tobias Larsson
tobias.larsson@medieinstitutet.se
072-310 39 23 */
