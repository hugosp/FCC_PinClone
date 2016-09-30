new Vue({
    el: '#pins',
    data: {
        pin: {
            stars:'0',
            url: '',
            description: ''
        },
        user: {},
        pins: [],
        images: []
    },

    ready: function() {
        this.fetchImgs();
        this.fetchPins();
        this.fetchCurrentUser();
    },

    methods: {
        fetchPins: function(id) {
            this.$http.get('/get?id='+id).then(function(data,err) {
                if(err) { console.log(err); }
                this.$set('pins', data.body);
            });
        },
           showMine: function(index) {
            
        },
        fetchImgs: function() {
            this.$http.get('/userimg').then(function(data,err) {
                if(err) { console.log(err); }
                this.$set('images', data.body);
            });
        },
        fetchCurrentUser: function() {
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
        },
        imageAndId: function(id) {
            var img ='';
            var username = '';
            if(typeof id !== 'undefined') {
                img = this.images.find(x => x.id === id).img;
                username = this.images.find(x => x.id === id).username; 
            }
            return img;
        }
    }
});
