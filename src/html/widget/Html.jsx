const Html = ({ config }) => {
  const blob = new Blob([config.widget.content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  return (
    <>
      <iframe src={url} width="100%" className="h-full w-full"></iframe>
    </>
  );
};

export default Html;
