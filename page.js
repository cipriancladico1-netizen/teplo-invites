 "use client";
import {useMemo,useState} from "react";

const steps=["Кого приглашаешь?","Как открыть приглашение?","Экран приглашения","Дата и время","Выбор","Публикация"];
const choices=["🍕 Пицца","🍣 Суши","🍔 Бургер","🍝 Паста","🎬 Кино","🎳 Боулинг","🌳 Прогулка"];

export default function Home(){
 const [step,setStep]=useState(0);
 const [gender,setGender]=useState("Женщину");
 const [open,setOpen]=useState("Сразу");
 const [title,setTitle]=useState("У меня есть для тебя предложение ❤️");
 const [subtitle,setSubtitle]=useState("Пойдём со мной на свидание?");
 const [yes,setYes]=useState("Да ❤️");
 const [no,setNo]=useState("Нет");
 const [date,setDate]=useState("20.09.2026");
 const [time,setTime]=useState("19:00");
 const [selected,setSelected]=useState(["🍕 Пицца"]);
 const [published,setPublished]=useState(false);
 const slug=useMemo(()=>Math.random().toString(36).slice(2,10),[published]);

 function toggle(x){setSelected(s=>s.includes(x)?s.filter(a=>a!==x):[...s,x])}
 function next(){ if(step<steps.length-1)setStep(step+1); else setPublished(true) }

 if(published) return <main className="shell"><header><div className="logo">ТЕПЛО</div></header><section className="success"><div className="heart">♥</div><h1>Приглашение готово!</h1><p>Твоя ссылка для отправки:</p><div className="link">teplo-date.vercel.app/meeting/v/{slug}</div><button onClick={()=>navigator.clipboard?.writeText(`https://teplo-date.vercel.app/meeting/v/${slug}`)}>Скопировать ссылку</button><button className="ghost" onClick={()=>setPublished(false)}>Вернуться к редактированию</button></section></main>

 return <main className="shell">
  <header><div className="logo">ТЕПЛО</div><span className="badge">онлайн-приглашение</span></header>
  <div className="progress">{steps.map((x,i)=><div className={i<=step?"dot active":"dot"} key={x}>{i+1}</div>)}</div>
  <div className="grid">
   <section className="editor">
    <div className="eyebrow">ШАГ {step+1} ИЗ {steps.length}</div>
    <h1>{steps[step]}</h1>
    {step===0 && <><p>Выбери, кому отправишь приглашение.</p><div className="row">{["Мужчину","Женщину"].map(x=><button className={gender===x?"choice selected":"choice"} onClick={()=>setGender(x)} key={x}>{x}</button>)}</div></>}
    {step===1 && <><p>Выбери способ открытия.</p>{["Сразу","Код из цифр","Конверт","В выбранное время"].map(x=><button className={open===x?"option selected":"option"} onClick={()=>setOpen(x)} key={x}>{x}</button>)}</>}
    {step===2 && <><label>Заголовок<input value={title} onChange={e=>setTitle(e.target.value)}/></label><label>Подзаголовок<input value={subtitle} onChange={e=>setSubtitle(e.target.value)}/></label><div className="row"><label>Да<input value={yes} onChange={e=>setYes(e.target.value)}/></label><label>Нет<input value={no} onChange={e=>setNo(e.target.value)}/></label></div></>}
    {step===3 && <><label>Дата<input value={date} onChange={e=>setDate(e.target.value)}/></label><label>Время<input value={time} onChange={e=>setTime(e.target.value)}/></label><p>Кто выбирает: <b>получатель</b></p></>}
    {step===4 && <><p>Выбери варианты для свидания.</p><div className="chips">{choices.map(x=><button className={selected.includes(x)?"chip selected":"chip"} onClick={()=>toggle(x)} key={x}>{x}</button>)}</div></>}
    {step===5 && <><p>Проверь всё перед публикацией.</p><div className="summary"><b>{gender}</b><span>Открытие: {open}</span><span>{date} · {time}</span><span>{selected.join(" · ")}</span></div></>}
    <button className="next" onClick={next}>{step===steps.length-1?"Опубликовать ❤️":"Продолжить →"}</button>
   </section>
   <section className="preview">
    <div className="preview-title">ДЕМОНСТРАЦИЯ</div>
    <div className="phone"><div className="phone-top">9:41　♡</div><div className="art">♥</div><h2>{title}</h2><p>{subtitle}</p><div className="datebox">📅 {date}<br/>🕖 {time}</div><div className="preview-buttons"><button>{yes}</button><button className="deny">{no}</button></div><div className="small">{selected.join(" · ")}</div></div>
   </section>
  </div>
  <footer>Политика конфиденциальности · Оферта · Поддержка</footer>
 </main>
}