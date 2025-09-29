import type { Article } from '../../types/article';

import css from './ArticleList.module.css';

//===============================================================

interface ArticleListProps {
  items: Article[];
}

function ArticleList({ items }: ArticleListProps) {
  return (
    <ul className={css.list}>
      {items.map(item => (
        <li className={css.item} key={item.objectID}>
          {item.url ? (
            <a
              className={css.link}
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {item.title}
            </a>
          ) : (
            <span>{item.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
