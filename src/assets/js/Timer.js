class Timer {
    constructor(startTime){
        this.startTime = startTime;
        this.init();
    }

    init(){
        this.parsedTime = this.parseTimeString(this.startTime);
    }

    parseTimeString(timeString){
        let splitedTiime = timeString.split(':');
        return {
            minutes: splitedTiime[0],
            seconds: splitedTiime[1]
        }
    }

    tick (){
        let time = this.getDateObjectByParsedTime(this.parsedTime);
        time.setSeconds(time.getSeconds()-1);
        let currentTime = this.timeToString(time);
        this.parsedTime = this.parseTimeString(currentTime);
        return currentTime;
    }

    getDateObjectByParsedTime(parsedTime){
        let time = new Date();
        time.setMinutes(parsedTime.minutes);
        time.setSeconds(parsedTime.seconds);
        return time;
    }

    setTimeByProgress(progress){
        let parsedTime = this.parseTimeString(this.startTime);
        let seconds = this.getSecondsByParsedTime(parsedTime);
        let currentProgressInSeconds = seconds - Math.floor(seconds*progress);
        let time = this.getDateObjectBySeconds(currentProgressInSeconds);
        let currentTime = this.timeToString(time);
        this.parsedTime = this.parseTimeString(currentTime);
        return currentTime;
    }

    getSecondsByParsedTime(parsedTime){
        return +parsedTime.minutes*60 + +parsedTime.seconds;
    }

    getDateObjectBySeconds(seconds){
        let time = new Date();
        time.setMinutes(0);
        time.setSeconds(seconds);
        return time;
    }

    timeToString(time){
        let seconds = time.getSeconds();
        seconds = seconds > 9 ? seconds : '0'+seconds;
        return `${time.getMinutes()}:${seconds}`
    }
}

export default Timer;