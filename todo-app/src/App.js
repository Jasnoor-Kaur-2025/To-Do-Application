import './App.css';
import list from './assets/list.svg';
import { useState } from 'react';
import emailjs from '@emailjs/browser';


function App() { 

  //Let's set some states now

  const [task, setTasks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskColor, setTaskColor] = useState('rgba(135, 192, 245, 1)');

  const handleAddTask = () => {
    if (taskName && taskDesc) {
      setTasks([...task, { name: taskName, description: taskDesc, color: taskColor }]);
      setTaskName('');
      setTaskDesc('');
      setTaskColor('rgba(135, 192, 245, 1)');
      setShowPopUp(false);
    } else {
      alert("Please enter both task name and description to add task");
    }
  }

  const handleCompleteTask = (index) => {
    const updatedTasks = [...task];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = task.filter((_, i) => i != index);
    setTasks(updatedTasks);
  }

  /**
   * const handleOrderPlacement = () => {
        if (cart.length === 0) {
          window.alert('Your cart is empty! Please add items to the cart before placing an order.');
          return;
        }
      
        const orderDetails = cart.map(item => `${item.name} (Qty: ${item.qty})`).join(', ');
        const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      
        // Prepare EmailJS parameters
        const emailParams = {
          order_details: orderDetails,
          total_price: totalPrice.toFixed(2),
        };
      
        emailjs
          .send('service_tzff5qa', 'template_69vhnwr', emailParams, 'D0DJlRxj_EMacbbLd')
          .then(() => {
            window.alert('Order placed successfully! Confirmation sent to the shop.');
            navigate('/');
          })
          .catch(err => {
            console.error('Failed to send email:', err);
            window.alert('Failed to place order. Please try again.');
          });
      };
   */

      const handleMailClick = () => {
        if (task.length === 0){
          window.alert("You have no tasks to be mailed");
          return;
        }

        const emailParams = {
          tasks: task.map(t => ({
            name: t.name,
            description: t.description,
          })),
        };

        emailjs.send(
          'service_tzff5qa', 'template_g0wd8ye', emailParams, 'D0DJlRxj_EMacbbLd'
        )
        .then((response) => {
          alert("Mail Sent!");
        })
        .catch((error) => {
          console.error("Email failed to send:", error);
        });

      };  

  return (
    <>
      <header>
        <nav>
          <ul>
            <button onClick={handleMailClick}>Mail Myself</button>
            <button onClick={() => setShowPopUp(true)}>Add Task</button>
          </ul>
        </nav>
        <div className="Titles">
          <h1>My Tasks</h1>
          <img src={list}></img>
        </div>
      </header>
      <div className="body">
        <ul className="Tasks">
          {
            task.map((taskName, index) => (
              <li key={index} style={{ border: `7px solid ${taskName.color}`, borderRadius: '8px' }}>
                <h3 style={{ border: `5px dotted ${taskName.color}`, padding: '7px', margin: '8px', textDecoration: taskName.completed ? `line-through ${taskName.color}` : 'none'}}>{taskName.name}</h3>
                <p style={{textDecoration: taskName.completed ? `line-through ${taskName.color}` : 'none'}}>{taskName.description}</p>
                <div className='ActionsTasks'>
                  <div
                    className={`completion-box ${taskName.completed ? 'checked' : ''}`}
                    onClick={() => handleCompleteTask(index)}
                    style={{border: `3px solid ${taskName.color}`}}
                  >
                    {taskName.completed && <span className="tick" style={{color: `${taskName.color}`}}>✔</span>}
                  </div>
                  <button onClick={() => deleteTask(index)} style={{ backgroundColor: `${taskName.color}` }}>Del</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      {showPopUp && (
        <div className='popup'>
          <div className="popup-content">
            <h2>Add Task</h2>
            <label>
              Task Name:
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </label>
            <label>
              Task Description:
              <textarea
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
              ></textarea>
            </label>
            <div className="color-options">
              <p>Select a Color:</p>
              <div
                className="color-circle"
                style={{ backgroundColor: 'rgba(245, 135, 242, 1)' }}
                onClick={() => setTaskColor('rgba(245, 135, 242, 1)')}
              ></div>
              <div
                className="color-circle"
                style={{ backgroundColor: 'rgba(135, 192, 245, 1)' }}
                onClick={() => setTaskColor('rgba(135, 192, 245, 1)')}
              ></div>
              <div
                className="color-circle"
                style={{ backgroundColor: 'rgba(238, 245, 135, 1)' }}
                onClick={() => setTaskColor('rgba(238, 245, 135, 1)')}
              ></div>
            </div>

            <div className="popup-buttons">
              <button onClick={handleAddTask}>Add</button>
              <button onClick={() => setShowPopUp(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
