import React from "react";

const ConvertirFecha = (props) => {
  const formatDate = () => {
    const date = new Date(props.fecha);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return <span>{formatDate()}</span>;
};

export default ConvertirFecha;