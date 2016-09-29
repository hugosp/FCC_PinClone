new Vue({
    el: '#pins',
    data: {
        pin: {
            stars:'0',
            url: '',
            description: ''
        },
        user: {},
        pins: []
    },

    ready: function() {
        this.fetchPins();
        this.fetchUser();
    },

    methods: {
        fetchPins: function() {
            this.$http.get('/get').then(function(data,err) {
                if(err) { console.log(err); }
                this.$set('pins', data.body);
            });
        },
        fetchUser: function() {
            this.$http.get('/profile').then(function(data,err) {
                if(err) { console.log(err); }
                this.$set('user', data.body);
            });
        },
        addPin: function(e) {
            e.preventDefault();
            
            if (this.pin.url && this.pin.description && this.user.id) {
                this.pin.userId = this.user.id;
                this.$http.post('/insert',this.pin).then(function(res){
                    this.pin = {
                        url: '',
                        description: ''
                    };
                    this.fetchPins();
                    });
            }
        },
        starPin: function(index) {
            this.$http.post('/star',{id:this.pins[index]._id}).then(function(res){
                this.fetchPins();
            });
        },
        deletePin: function(index) {
            this.$http.post('/delete',{id:this.pins[index]._id}).then(function(res){
                this.fetchPins();
            });
        }
    }
});
