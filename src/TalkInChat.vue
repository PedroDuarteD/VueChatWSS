<template>
    <div>
         





      <div style="margin-top: 2vh">
        Talk in Chat
        </div>

     
        <div id="global"> 
   <div id="chat">
   <div id="allMessages">
          <div v-for="message in messages " :key="message.id" style="margin-bottom: 3vh;">
            <div :class="'Pedro Duarte'==message.user? 'my_messageName' : 'other_messageName'" >
              {{ message.user }}
            </div>
            <div  :style="'Pedro Duarte'==message.user?'display: flex;': 'display: flex;justify-content: end'"> 
<div :class="   'Pedro Duarte'==message.user? 'my_message' : 'other_message' ">
                {{message.message}}
              </div>
            </div>
              
          </div>
      </div>
  
        <div id="chat-row">
        <input type="text" id="chat-message" placeholder="Message" v-model="edit">
         <div class="btn_send" @click="Send()">Send</div>
      </div>
      </div>
        </div>

   

    

      <div  style="display: flex; flex-direction: column; justify-content: center; align-items: center;width: 100%; height: 10vh;position: fixed; bottom: 0px;  left: 0px; box-shadow: 1px 10px 20px ;">
        <div>
          <span style="color: red;margin-right: 1vw;">power by</span>
          <span>VueJS + Laravel (beyondcode)</span>
        </div>

      </div>
    </div>
  </template>
   <script>
   import axios from "axios";
   export default {
    name: 'TalkInChat',
    data(){
      return {
        edit: "",
        room: this.$route.params.room,
        name: "",
        my: "Pedro Duarte",
        messages: [
        ]
      }
    },
    mounted(){
        axios.get("https://backend.pedroduarte.online/api/getMessages",{
            params: {
                "code" : this.room
            }
        })
      .then(res =>{
        console.log("res: ",res)

        this.name = res.data.name;
        res.data.sms.map((e)=>{
            this.messages.push( {
          id: e.id,
          message: e.message,
          user: e.user
        })
        })
      })
    
    
    
      
      window.Echo.channel("my_chat")
      .listen("."+this.room,(e)=>{
        this.messages.push( {
          id: e.id,
          message: e.message,
          user: e.name
        })
      })
    },
    methods: {
        Send : function(){
    
    if(this.edit!=""){
      axios.post("https://backend.pedroduarte.online/api/sent",  {
          text: this.edit,
          generated: this.room,
          admin: true,
          name: this.my
      }).then(e =>{
        if(e.status==200){
          this.edit=""
        }
      })
      
    }
  }
    }
   }

</script>