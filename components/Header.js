import Link from 'next/link'
function Header() {
    return (
        <header style={{
            'backgroundColor': '#555568',
            'padding': '10px 20px',
            'color': 'white',
            'display': 'flex',
            'justifyContent': 'space-between',
            'alignItems': 'center'
        }}>
            <Link href="/" style={{'fontSize':'30px'}}>Questanda</Link>
         
        </header>
    );
}
export default Header;