new Vue({
    el: '#pins',
    data: {
        pin: {
            stars:'0',
            url: '',
            description: ''
        },
        pins: []
    },

    ready: function() {
        this.fetchPins();
    },

    methods: {
        fetchPins: function() {
            this.$http.get('/get').then(function(data,err) {
                if(err) { console.log(err); }
                this.$set('pins', data.body);
            });
        },
        addPin: function(e) {
            e.preventDefault();
            
            if (this.pin.url && this.pin.description) {
                this.$http.post('/insert',this.pin).then(function(res){
                    this.pin = {
                        url: '',
                        description: ''
                    };
                    this.fetchPins();
                    console.log(res);
                });
            }
        },
        starPin: function(index) {
            var star = this.pins[index].stars++;
            this.$set(index,{'stars': star});
        }
    }
});
