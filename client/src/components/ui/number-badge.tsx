export function NumberBadge({ number }: { number: number }) {
    return (
        <div className="w-16 h-10 rounded-full bg-linear-to-r from-primary to-primary/70  text-white flex items-center justify-center font-extrabold">
            {number}
        </div>
    );
}