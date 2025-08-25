import React, { useEffect } from "react";
import CartStore from "../../store/CartStore";
import ProductsSkeleton from "../../skeleton/products-skeleton";
import NoData from "./../layout/no-data";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const InvoiceList = () => {
  const { InvoiceList, InvoiceListRequest } = CartStore();

  useEffect(() => {
    (async () => {
      await InvoiceListRequest();
    })();
  }, []);

  // ✅ Helper to safely convert values to number
  const toNumber = (val) => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };

  // ✅ Generate PDF for a single invoice (no table)
  const generateSingleInvoicePDF = (invoice) => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Header
    pdf.setFontSize(18);
    pdf.setTextColor(40);
    pdf.text("INVOICE", 14, 20);

    pdf.setFontSize(11);
    pdf.setTextColor(100);
    pdf.text(`Invoice No: ${invoice.tran_id}`, 14, 30);
    pdf.text(`Date: ${invoice.date || "N/A"}`, 14, 36);

    // Company Info
    pdf.setFontSize(12);
    pdf.setTextColor(40);
    pdf.text("Rakib's E-Commerce", 200, 20, { align: "right" });
    pdf.setFontSize(10);
    pdf.text("Patuakhali Science And Technology University", 200, 26, { align: "right" });
    pdf.text("Patuakhali, Bangladesh", 200, 32, { align: "right" });
    pdf.text("rakib18@cse.pstu.ac.bd", 200, 38, { align: "right" });

    // Customer Info
    pdf.setFontSize(12);
    pdf.text("Bill To:", 14, 50);
    pdf.setFontSize(10);
    pdf.text(invoice.cus_details || "Unknown Customer", 14, 56);
    pdf.text(invoice.ship_details || "No Shipping Details", 14, 62);

    // Totals Section
    let y = 90; // starting Y position after customer info
    pdf.setFontSize(12);
    pdf.text(`Payment: ${invoice.payment_status}`, 14, y);
    pdf.text(`Delivery: ${invoice.delivery_status}`, 14, y + 6);

    // pdf.setFontSize(12);
    // pdf.text(
    //   `Subtotal: $${toNumber(invoice.subtotal).toFixed(2)}`,
    //   200,
    //   y,
    //   { align: "right" }
    // );
    // pdf.text(`Tax: $${toNumber(invoice.tax).toFixed(2)}`, 200, y + 6, {
    //   align: "right",
    // });
    pdf.setFontSize(14);
    pdf.text(
      `Total: $${toNumber(invoice.total).toFixed(2)}`,
      200,
      y + 14,
      { align: "right" }
    );

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(150);
    pdf.text("Thank you for your Shopping!", 105, 290, { align: "center" });

    pdf.save(`invoice-${invoice.tran_id}.pdf`);
  };

  if (InvoiceList === null) {
    return <ProductsSkeleton />;
  } else if (InvoiceList.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              <ul className="list-group list-group-flush">
                {InvoiceList.map((item) => {
                  return (
                    <li
                      key={item._id}
                      id={`invoice-${item._id}`}
                      className="list-group-item mb-4 p-3 border rounded"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="m-1">
                            <b>Invoice No:</b> {item.tran_id}
                          </p>
                          <p className="m-1">
                            <b>Customer:</b> {item.cus_details}
                          </p>
                          <p className="m-1">
                            <b>Shipping:</b> {item.ship_details}
                          </p>
                          <p className="m-1">
                            <b>Payment:</b> {item.payment_status}
                          </p>
                          <p className="m-1">
                            <b>Delivery:</b> {item.delivery_status}
                          </p>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <Link
                            className="btn btn-success mb-2"
                            to={`/invoice/${item._id}`}
                          >
                            Details
                          </Link>
                          <button
                            className="btn btn-primary"
                            onClick={() => generateSingleInvoicePDF(item)}
                          >
                            Download PDF
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default InvoiceList;
