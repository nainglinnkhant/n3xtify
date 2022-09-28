export default function Spinner({ red = false }) {
    return (
        <div
            className={`spinner-border ${red ? 'text-danger' : 'text-light'}`}
            style={{ width: '1rem', height: '1rem' }}
            role='status'
        >
            <span className='visually-hidden'>Loading...</span>
        </div>
    )
}
