import { useState } from "react";

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDate] = useState('');
    const [reminder, setReminder] = useState(false);
    const onSubmit = e => {
        e.preventDefault()
        if(!text) {
            alert('please provide text')
            return
        }
        onAdd({text, day, reminder})
        setText('')
        setDate('')
        setReminder(false)
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" placeholder="Add Day & Time" value={day} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" value={reminder} onChange={e => setReminder(e.currentTarget.checked)} checked={reminder} />
            </div>
            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    );
}

export default AddTask;