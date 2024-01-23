<template>
    <div>

      <div style="margin-top: 2vh">
          <span style="font-weight: bold;">Websockets</span> communication
        </div>

     
        <div id="global"> 
   <div id="chat">
   <div id="allMessages">
          <div v-for="message in messages " :key="message.id" style="margin-bottom: 3vh;">
            <div :class="$route.params.name==message.user? 'my_messageName' : 'other_messageName'" >
              {{ message.user }}
            </div>
            <div  :style="$route.params.name==message.user?'display: flex;': 'display: flex;justify-content: end'"> 
<div :class="   $route.params.name==message.user? 'my_message' : 'other_message' ">
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
    name: 'Chat',
    data(){
      return {
        edit: "",
        name: this.$route.params.name,
        code: "example",
        priv: false,
        messages: [
          
        ]
      }
    },
    props: [
      "codigo"
    ],
   
    components: {
    },
    mounted(){
      this.code= this.$route.path.split("/")[3]

      axios.get("https://backend.pedroduarte.online/api/getMessages",{
            params: {
                "code" : this.code
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
      .listen("."+this.code,(e)=>{
        console.log("receive: ",e)
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
              generated: this.code,
              name: this.$route.params.name,
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
  
  <style>


  .btn_send{
    border-radius: 6px;
    display: inline-block;
    padding: 10px 20px 10px 20px;
    font-weight: bold;
    color: rgba(63, 84, 104, 1);
    font-size: 0.8em;
    background-color: rgba(0, 189, 130, 1);
  }

  .my_message{
    display: inline-flex;
     border: 1px solid rgba(0, 0, 0, .28);
      padding-left: 1vw; 
      padding-top: 1vh;
       padding-right: 1vw;
        padding-bottom: 1vh;
         border-radius: 0px 10px 10px 10px;
  }

  .my_messageName{
    color: black;
    display: flex; 
    font-weight: 500;
     margin-bottom: 1vh;
  }
  .other_messageName{
    color: red;
    display: flex;
     font-weight: 500;
      margin-bottom: 1vh;
    justify-content: end;

  }
  .other_message{
    display: inline-flex;
     border: 1px solid rgba(0, 0, 0, .28);
      padding-left: 1vw; 
      padding-top: 1vh;
       padding-right: 1vw;
        padding-bottom: 1vh;
         border-radius: 10px 0px 10px 10px;
  }
  #global{
    display: flex; justify-content: center;align-items: center;margin-top: 5vh;
  }
  #chat{
    width: 40%;height: 70vh; border-radius: 10px; border: 6px solid rgba(63, 84, 104, 1);
  }
  #allMessages{
    display: flex; flex-direction: column; height: 63vh; margin: 10px;overflow-y: auto;
  }
  #chat-row{
    width: 80%; 
    display: flex; 
    justify-content: space-between;
     margin-right: 10%; 
     margin-left: 10%;
  }
  #chat-message{
    padding: 10px;
     border-radius: 5px;
     border: 1px solid rgba(0, 189, 130, 1);
     width: 80%
  }
  </style>
  