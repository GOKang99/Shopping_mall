import "./Pagenation.css";

const Pagenation = ({ total, perPage, onClick, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pages.push(i);
  }
  currentPage = currentPage ? currentPage : 1;
  return (
    <>
      {pages.length > 1 && (
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={
                  parseInt(currentPage) === page
                    ? "pagination_button active"
                    : "pagination_button"
                }
                onClick={() => onClick(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pagenation;
