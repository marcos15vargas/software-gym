import { supabase } from '../db/supabase.js';


document.querySelectorAll('.del').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = item.getAttribute('data-id');
        console.log(userId);
        deleteUser(userId);
        
        setTimeout(() => {
            window.location.reload();
        }, 1500); // espera 1.5 segundos
    })
})

async function deleteUser(id){    
    const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
            
}