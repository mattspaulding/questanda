import Image from 'next/image'
import Link from 'next/link'
function Header() {
    return (
        <header style={{
            'backgroundColor': '#a4c991',
            'padding': '10px 20px',
            'color': 'white',
            'display': 'flex',
            'justifyContent': 'space-between',
            'alignItems': 'center'
        }}>
            <Link href="/"><Image src="/logo.png" alt="Company Logo" className="logo" width={100} height={100} /></Link>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;