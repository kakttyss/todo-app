class TaskTracker {
    constructor(tasks) {
        this.tasks = tasks
    }

    add(taskDescription) {
        this.tasks.push(taskDescription)
    }

    done(taskIndex) {
        this.tasks = this.tasks.filter((_, idx) => idx != taskIndex) 
    }

    exec(taskDescription, param) {
        switch(taskDescription) {
            case "add":
                this.add(param)
                break;
            case "done":
                this.done(param)
                break;
            case "list":
                return this.tasks
        }
    }
}

module.exports = {TaskTracker}