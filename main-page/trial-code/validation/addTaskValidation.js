export function validateTaskInput(input, existingTasks, deadlineInput) {
    const deadlineValue = new Date(deadlineInput);
    const now = new Date();

    const validations = [
        { condition: input.trim() === '', message: "Write a task!" },
        { condition: existingTasks.some(task => task.taskName === input.trim()), message: "Task Already Exists!!" },
        { condition: isNaN(deadlineValue), message: "Enter a deadline!!" },
        { condition: deadlineValue <= now, message: "Deadline must be in the future!" },
    ];

    for (const { condition, message } of validations) {
        if (condition) {
            alert(message);
            return false;
        }
    }

    return true;
}
