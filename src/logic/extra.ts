// can be put in utils folder
export function empty_validation(input_array: HTMLInputElement[]) {
    // Instead of using if check directly return the bool calculated in the condition.
    // Like =>  return length !== 0;
    if (input_array.length === 0) return false;
    for (let i = 0; i < input_array.length; i++)
        if (input_array[i].value === "") return false;
    return true;
}

export function clean_field(input_array: HTMLInputElement[]) {
    for (let i = 0; i < input_array.length; i++)  input_array[i].value = "";
}

export function time() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
}

