import { useState } from 'react';
import { renewSubscription } from '../lib/renew.supabase.js';

export default function RenewButton({ userId, currentPayDay }) {
    const [monthNumber, setMonthNumber] = useState(1);

    const handleRenew = async () => {
        const result = await renewSubscription(userId, currentPayDay, monthNumber);
        if (result.success) {
            window.location.reload();
        } else {
            alert('Error al renovar la suscripción');
        }
    };

    return (
        <div className="flex items-center gap-4">
            <label className="font-bold text-amarillo" htmlFor="month">Meses a Renovar</label>
            <input
                type="number"
                id="month"
                className="max-w-12 border-2 border-amarillo rounded "
                value={monthNumber}
                min={1}
                max={3}
                onChange={e => setMonthNumber(Number(e.target.value))}
            />
            <button
                className="bg-amarillo text-fondo font-bold py-2 px-4 rounded cursor-pointer hover:bg-yellow-600 transition"
                onClick={handleRenew}
            >
                Renovar suscripción
            </button>
        </div>
    );
}