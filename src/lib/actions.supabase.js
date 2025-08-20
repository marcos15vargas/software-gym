import { supabase } from '../db/supabase.js';

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
const userId = urlParams.get('id');

console.log(type, userId, 'tipo y id');


if( type == 'insert'){
    document.getElementById('sendForm').addEventListener('click',(event) => {
        event.preventDefault();
        insertUser();
    });
}else if( type == 'edit'){
    getUserId()
    document.getElementById('sendForm').addEventListener('click',(event) => {
        event.preventDefault();
        updateUser(userId);
    });
}


async function getUserId() {
    const { data: user, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId);
      console.log(user);
    document.getElementById('name').value = user[0].name
    document.getElementById('lastName').value = user[0].lastName
    document.getElementById('plan').value = user[0].plan
    document.getElementById('payDay').value = user[0].payDay
}



async function insertUser() {
    let name = document.getElementById('name').value
    let lastName = document.getElementById('lastName').value
    let plan = document.getElementById('plan').value
    let payDay = document.getElementById('payDay').value


    const { data, error } = await supabase
      .from('users')
      .insert([
        {
            name: name,
            lastName: lastName,
            plan: plan,
            payDay: payDay,
        },
      ])
      .select()
    
    if (error) {
        console.error('Error inserting user:', error);
    }else{
        window.location.href = `/found/${data[0].id}`;
    }
}


async function updateUser(id) {
    console.log('Updating user with ID:', id);
    let name = document.getElementById('name').value
    let lastName = document.getElementById('lastName').value
    let plan = document.getElementById('plan').value
    let payDay = document.getElementById('payDay').value

    const { data, error } = await supabase
      .from('users')
      .update({
        name: name,
        lastName: lastName,
        plan: plan,
        payDay: payDay,
      })
      .eq('id', id)
      .select();
    
    console.log(data, error);
    if (error) {
        console.error('Error updating user:', error);
    } else {
        window.location.href = `/found/${data[0].id}`;
    }
}