new Vue({
    el: '#app',
    data: {
        title: 'Asia Local TimeZone',
        age: '',
        vtime: '',
        vdate: '',
        vdate1: '',
        region: 'Asia/Yangon',
        asiaTimeZones: [],
    },
    methods: {
        onChange(event) {
            this.region = event.target.value;
        },
        changeTZFormat(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
                timeZone: tzString
            }));
        },
        timeZone() {
            let now = new Date();
            return this.changeTZFormat(now, this.region);
        },
        addZero(i) {
            if (i < 10) i = "0" + i
            return i;
        },
        timeZoneFormatApi() {
            const data = fetch('timezone.json', {
                    method: 'get'
                })
                .then(res => res.json())
                .then(res => res.timezone)
                .catch(e => console.log(e))
            return data;
        },
        clock() {

            const MoNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const MoDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            let MM = this.timeZone();
            let year = MM.getFullYear();
            // the month (0 to 11) of a date.
            let monthNames = MoNames[MM.getMonth()];
            // the month (0 to 11) of a date.
            let monthDigit = MoDigit[MM.getMonth()];
            // 0 - 6 day fomat 0 - sunday
            let day = MM.getDay();
            // The day of the month (1 to 31).
            let date = MM.getDate();
            // 24 hours format 1 - 24
            let hour = MM.getHours();
            // 59 mins format 0 - 59
            let min = MM.getMinutes();
            // 59 sec format 1 - 59
            let sec = MM.getSeconds();

            this.vdate1 = +date + "/" + this.addZero(monthDigit) + "/" + year;
            this.vdate = +date + "-" + monthNames + "-" + year;

            if (hour == 12) this.vtime = this.addZero(hour) + ":" + this.addZero(min) + ":" + this.addZero(sec) + " PM";
            else if (hour > 12) this.vtime = this.addZero(hour) - 12 + ":" + this.addZero(min) + ":" + this.addZero(sec) + " PM";
            else if (hour == 0) this.vtime = this.addZero(12) + ":" + this.addZero(min) + ":" + this.addZero(sec) + " AM";
            else this.vtime = this.addZero(hour) + ":" + this.addZero(min) + ":" + this.addZero(sec) + " AM";

            // This is my age Not Your
            this.age = year - 2000;

            setTimeout(this.clock, 1000);
        }
    },
    mounted() {
        this.timeZoneFormatApi().then(res => {
            this.asiaTimeZones = res;
            this.clock();
        });
    }
})