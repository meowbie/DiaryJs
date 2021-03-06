const WorkDay = require("../models/WorkDay");
const dts = require("./DateTimeService")

class WorkService {
    constructor() {
        this.currentWorkDay = null;
    }

    // Return success result
    clockIn() {
        if (this.currentWorkDay == null) {
            // Does not save to db until day over.
            this.currentWorkDay = WorkDay.build({
                startTime: Date()
            });
            return true;
        }
        return false;
    }

    // Return success result
    async clockOut() {
        if (this.currentWorkDay != null) {
            // this.currentWorkDay.clockOut();
            // this.history.push(this.currentWorkDay);
            this.currentWorkDay.endTime = new Date();
            await this.currentWorkDay.save();
            this.currentWorkDay = null;
            return true;
        }
        return false;
    }

    get currentNote() {
        if (this.currentWorkDay != null)
            return this.currentWorkDay.note;
        return null;
    }
    // Return success result
    set currentNote(noteText) {
        if (this.currentWorkDay != null) {
            this.currentWorkDay.note = noteText;
            return true;
        }
        return false;
    }

    async getHistoryAsync() {
        return (await WorkDay.findAll()).reverse();
    }
}

// Singleton
module.exports = new WorkService();