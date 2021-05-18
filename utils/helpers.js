module.exports = {
    pluralize_people: amount => {
        if(amount === 1) {
            return 'person';
        }
        return 'people';
    }
}