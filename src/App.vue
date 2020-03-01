<template>
  <div id="app">
    <div class="container" align="center">
      <b-card style="width:50%">
        <template v-slot:header>
          <img src="./assets/Blackpinklogo-1.svg"/>
        </template>
        <b-card-body>
          <h1 style="padding-bottom:7%" >You can get free concert</h1>
          <img src="./assets/Blackpinklogo-2.svg" style="padding-bottom:7%"><br>
          <img src="./assets/Pic-Blackpink.svg" style="padding-bottom:7%">
          <p>{{ this.date2Free }}</p>
          <b-button pill style="font-size:40px" id="mainBtn" @click="submit()"> {{this.buttonValue}} </b-button>
        </b-card-body>
        <template v-slot:footer>
          <small class="text-muted">Blackpink in your area</small>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>

import TicketProvider from './providers/TicketProvider'
import TimeProvider from './providers/TimeProvider'

export default {
  name: 'app',
  data(){
    return{
      date2Free:"Tuesday 28 January 2020 at 06.00 PM.",
      buttonValue:"Get ticket now"
    }
  },
  mounted(){
    this.isAvailable('BP')
  },
  methods:{
    async submit(){
      let resp = await TicketProvider()

      let heading,msg,style

      if(resp.ok == "true"){
        heading = "ยินดีด้วย"
        msg = `คุณได้รับบัตรคอนเสิร์ต BLACKPINK รหัส <b>${resp.ticket_id}</b>`
        style = "success"
      }
      else{
        heading = "เสียใจด้วย"
        msg = 'บัตรคอนเสิร์ต BLACKPINK หมดแล้ว'
        style = "error"
        this.buttonValue = "Sold out"
      }

      this.$swal(heading,msg,style)
    },
    async isAvailable(id){
      let resp = await TimeProvider({"data":id})
      if (resp.ok == "true"){
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        
        let date_got = new Date(resp.availDate.date)
        this.date2Free = `${days[date_got.getDay()]} ${date_got.getDay()+1} ${months[date_got.getMonth()]} ${date_got.getFullYear()} at ${resp.availDate.time}`

        let now = new Date()
        if(now >= new Date(date_got)){
          let curHour = now.getHours()
          let curMinute = now.getMinutes()
          let curTime = curHour+(curMinute/100)
          if(curTime < resp.availDate.time){
            document.getElementById('mainBtn').disabled = true
            this.buttonValue = "Coming soon"
          }
        }else{
          document.getElementById('mainBtn').disabled = true
          this.buttonValue = "Coming soon"
        }
      }
    }
  },
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
