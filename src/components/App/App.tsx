import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";

import {
  SearchForm,
  ArticleList,
  Loader,
  Button,
  OrderForm,
} from "../../index";

import { fetchArticles } from "../../services/articleService";

import clsx from "clsx";
import css from "./App.module.css";

//===============================================================

function App() {
  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["articles", topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic.trim() !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.nbPages ?? 0;
  const hitsCount = data?.hits?.length ?? 0;

  const handleSearch = (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
    setHasSearched(true);
  };

  const handleReset = () => {
    setTopic("");
    setCurrentPage(1);
    setHasSearched(false);
    toast.success("Search completed!");
  };

  useEffect(() => {
    if (isSuccess && hitsCount === 0) {
      toast("No results found", { icon: "🔍" });
    }
  }, [isSuccess, hitsCount]);

  return (
    <div className={css.container}>
      <section className={clsx(css.card, css.stack)}>
        <SearchForm onSubmit={handleSearch} />

        {isLoading && (
          <div className={css.loaderRow}>
            <Loader label="Loading data…" />
          </div>
        )}

        {isError && (
          <p className={css.error}>
            Whoops, something went wrong! Please try again.
          </p>
        )}
      </section>

      {hasSearched && (
        <section className={clsx(css.card, css.stack)}>
          <div className={css.headerRow}>
            <h2>Results</h2>
            <Button
              text="Reset"
              variant="reset"
              type="button"
              onClick={handleReset}
            />
          </div>

          {isSuccess && totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              forcePage={currentPage - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}

          {hitsCount > 0 && <ArticleList items={data!.hits} />}

          {isSuccess && hitsCount === 0 && (
            <p className={css.empty}>
              No results found for "{topic}". Try another query.
            </p>
          )}
        </section>
      )}

      <section className={clsx(css.card, css.stack)}>
        <OrderForm />
      </section>
    </div>
  );
}

export default App;
