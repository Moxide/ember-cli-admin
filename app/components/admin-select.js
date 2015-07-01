import Ember from "ember";

export default Ember.Component.extend({
  content: [],
  selectedValue: null,

  actions: {
    change() {
      const changeAction = this.get('action');
      const selectedEl = this.$('select')[0];
      let selectedIndex = selectedEl.selectedIndex;
      if (this.get('prompt')){
        selectedIndex = selectedIndex - 1;
      }
      const content = this.get('content');
      const selectedValue = content[selectedIndex];
      if (selectedValue){
        this.set('selectedValue', selectedValue);
        if (changeAction){
          changeAction(selectedValue);
        }
      }
    }
  }
});
