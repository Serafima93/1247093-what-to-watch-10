function ErrorMessage(): JSX.Element | null {
  return (
    <div
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        padding: '10px',
        backgroundColor: '#d96666',
        color: '#fff',
        borderRadius: '5px',
        zIndex: '1000',
      }}
    >
      Form is not correct
    </div>
  );
}

export default ErrorMessage;
