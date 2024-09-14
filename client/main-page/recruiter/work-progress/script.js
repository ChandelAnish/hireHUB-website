const ongoingJobId = sessionStorage.getItem("ongoingJobId");
let tasksArray;

// fetch single job details
const getSingleJobs = async (job_id) => {
    const response = await fetch(`${BASE_URL}/post-jobs/${job_id}`);
    const data = await response.json();
    return data;
}

// update job task
const updateTask = async (job_id, tasks) => {
    const response = await fetch(`${BASE_URL}/post-jobs/${job_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(tasks)
    });
    const data = await response.json();
    return data;
}

let totalTask;
let completedTask;
//progress bar display
const progressBarUpdate = () => {
    let percentage = (completedTask / totalTask) * 100;
    let progressPercentage = document.getElementById('progressPercentage');
    progressPercentage.style.width = `${percentage}%`;
}

//mark task complete
const markComplete = async(id,index) => {
    const task = document.getElementById(id)
    // console.log(completedTask)
    if (task.checked) {
        completedTask++;
        tasksArray[index].completed = true;
        // console.log(tasksArray)
        const response = await updateTask(ongoingJobId,{tasks:tasksArray});
        console.log(response)
        progressBarUpdate();
    }
    else {
        completedTask--;
        tasksArray[index].completed = false;
        // console.log(tasksArray)
        const response = await updateTask(ongoingJobId,{tasks:tasksArray});
        console.log(response)
        progressBarUpdate();
    }
}


addEventListener('load', async () => {
    const data = await getSingleJobs(ongoingJobId);
    // completions=data.completions;
    // console.log(data)
    // console.log(data.tasks)
    const tasks = document.getElementById('tasks');
    tasks.innerHTML = '';
    totalTask = 0;
    completedTask = 0;
    tasksArray=data.tasks;
    // console.log(tasksArray)
    tasksArray.forEach((item, index) => {
        let check=null;
        if(item.completed)
        {
            check = 'checked';
            completedTask++;
        }
        tasks.innerHTML += `<label><input type="checkbox" onclick="markComplete('task${index}',${index})" id="task${index}" ${check}> ${item.task}</label>`
        totalTask++;
    });
    progressBarUpdate()
})