const Fallback = ({ blok }) => {
  return (
    <div style={{ padding: '1rem', border: '1px dashed red', color: 'red'}}>
      Component <strong>{blok.component}</strong> is not registered.
    </div>
  )
}

export default Fallback;