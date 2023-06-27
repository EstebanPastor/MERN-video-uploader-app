const UploadButton = ({ name, onClick, icon, bg, type, disabled }) => {
  return (
    <div>
      <button
        style={{
          background: bg,
        }}
        onClick={onclick}
        type={type}
        disabled={disabled}
      >
        {icon}
        {name}
      </button>
    </div>
  );
};


export default UploadButton;
