<template>
    <div>
            <h1>Admin Rooms</h1>
            <div v-for="room in rooms" :key="room.id">
                <div @click="OpenTalk(room)" style="border: 1px solid red; padding: 10px; margin-bottom: 1vh;">
                    {{ room.name  }} - {{ room.code }}
                </div>
            </div>
    </div>
  </template>
   <script>
   import axios from "axios";
   export default {
    name: 'Admin',
    data(){
      return {  
        rooms: []
      }
    },
    mounted(){
this.Verify()
    },
    methods: {

        OpenTalk(room){
            this.$router.push({name: "Talk",params: {room: room.code}})
        },
        Verify(){
                axios.get("https://backend.pedroduarte.online/api/getRooms",{
                    params: {
                        pass: ""
                    }
                })
                .then(res => {
                    res.data.map((item)=>{
                        console.log("name: ",item.code)
                        this.rooms.push({
                            id: item.id,
                            name: item.name,
                            code: item.code
                        })
                    })
                })

        }
    }
   }

</script>