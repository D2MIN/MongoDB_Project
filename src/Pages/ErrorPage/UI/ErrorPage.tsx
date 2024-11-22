import React from "react";
import style from "./ErorPage.module.scss";
import { Link, useRouteError } from "react-router-dom";
import { reactRouteErrorPageI } from "../../../Shared/Interfaces/AllInterfaces";

export default function ErrorPage() {
  const errorRes = useRouteError() as reactRouteErrorPageI;
  console.log(errorRes);
  return (
    <div className={style.errorPage}>
      <div className={style.errorSection}>
        <h1>Извините, произошла непредвиденная ошибка.</h1>
        <h2>
            <i> Ошибка : {errorRes.statusText || errorRes.error.message}</i>
        </h2>
      </div>
      <div className={style.linkToSiteSection}>
        <Link to="/" className={style.button}>
            Вернутся на главную страницу
        </Link>
      </div>
    </div>
  );
}