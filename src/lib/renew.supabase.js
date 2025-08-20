import { supabase } from '../db/supabase';

export function isSubscriptionActive(payDay) {
    if (!payDay) return false;
    const expiration = new Date(payDay);
    const now = new Date();

    // Si hoy es antes o igual al vencimiento, puede acceder
    return now <= expiration;
}

// Nueva función para renovar la suscripción
export async function renewSubscription(userId, currentPayDay, monthNumber) {
    const date = new Date(currentPayDay);
    date.setMonth(date.getMonth() + monthNumber); // Suma 1 mes

    const newPayDay = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    const { error } = await supabase
        .from('users')
        .update({ payDay: newPayDay })
        .eq('id', userId);

    return { success: !error, newPayDay, error };
}