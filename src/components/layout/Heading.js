export default function Heading({ title, avatar }) {
	return (
		<h1 className="heading" src={avatar}>
			{title}
		</h1>
	);
}
