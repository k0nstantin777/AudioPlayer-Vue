class Timer {
    constructor(time){
        this.time = time;
        this.init();
    }

    init(){
        this.parsedTime = this.parseTimeString();
    }

    parseTimeString(){
        let splitedTime = this.time.split(':');
        return {
            minutes: splitedTime[0].length > 1 ? splitedTime[0][1] : splitedTime[0],
            tenSeconds: splitedTime[1].length > 1 ? splitedTime[1][0] : 0,
            seconds: splitedTime[1].length > 1 ? splitedTime[1][1] : splitedTime[1]
        }
    }

    tick (){
        if(this.parsedTime.minutes == 0 && this.parsedTime.seconds == 0 && this.parsedTime.tenSeconds == 0 && this.parsedTime.tenMinutes ) {
            return this.timeToString();
        }
        if (this.parsedTime.seconds > 0) {
            this.parsedTime.seconds--;
        } else if(this.parsedTime.seconds == 0 && this.parsedTime.tenSeconds != 0){
            this.parsedTime.tenSeconds--;
            this.parsedTime.seconds = 9;
        } else if(this.parsedTime.tenSeconds == 0 && this.parsedTime.seconds == 0) {
            this.parsedTime.minutes--;
            this.parsedTime.tenSeconds = 5;
            this.parsedTime.seconds = 9;
        } 
        return this.timeToString();
    }

    timeToString(){
        return `${this.parsedTime.minutes}:${this.parsedTime.tenSeconds}${this.parsedTime.seconds}`
    }
}

export default Timer;