import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const Invoice = ({ order }) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#E4E4E4",
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
    },

    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>
          <Text style={styles.header}>
            {"\n"}
            {"\n"} ~ {new Date().toLocaleDateString()} ~{" "}
          </Text>
          {"\n"}
          {"\n"}

          <Text style={styles.title}> Order Invoice </Text>
          {"\n"}
          {"\n"}
          <Text style={styles.author}> Ecommerce Project </Text>
          {"\n"}
          {"\n"}
          <Text style={styles.subtitle}> Order summary </Text>
          {"\n"}
          {"\n"}
        </Text>

        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={(c) => c.product.title} />
            <DataTableCell getContent={(c) => c.product.price} />
            <DataTableCell getContent={(c) => c.count} />
            <DataTableCell getContent={(c) => c.product.brand} />
            <DataTableCell getContent={(c) => c.color} />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          {"\n"}
          {"\n"}
          <Text>
            ordered on:{" "}
            {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}
          </Text>
          {"\n"}
          {"\n"}
          <Text>Payment id : {order.paymentIntent.id}</Text>
          {"\n"}
          {"\n"}
          <Text>Order Status: {order.orderStatus}</Text>
          {"\n"}
          {"\n"}
          <Text>Total Paid: ${order.paymentIntent.amount / 100}</Text>
          {"\n"}
          {"\n"}
        </Text>

        <Text style={styles.footer}>~ Thank you for shopping with us!</Text>
      </Page>
    </Document>
  );
};

export default Invoice;
