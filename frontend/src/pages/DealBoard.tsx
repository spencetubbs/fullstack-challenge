import React from 'react';
import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';

// TODO: go back and group deals by status in the api
const columns = [
  {
    title: "Build Proposal",
    totalValue: "$183,000.00",
    deals: [
      { name: "Amazon", amount: "$0" },
      { name: "Amazon", amount: "$0" },
      { name: "Amazon", amount: "$15,000" },
      { name: "Amazon", amount: "$168,000" },
      { name: "Moose’s Tooth", amount: "$0" },
      { name: "Nike", amount: "$0" },
    ],
  },
  {
    title: "Pitch Proposal",
    totalValue: "$0.00",
    deals: [
      { name: "Ford", amount: "$0" },
      { name: "Ford", amount: "$0" },
      { name: "Google", amount: "$0" },
    ],
  },
  {
    title: "Negotiation",
    totalValue: "$53,000.00",
    deals: [
      { name: "Amazon", amount: "$13,000" },
      { name: "Rio Azul", amount: "$40,000" },
    ],
  },
];

export const DealBoard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {columns.map((col) => (
          <Grid key={col.title}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{col.title}</Typography>
              <Typography variant="subtitle2" color="text.secondary">{col.totalValue}</Typography>
              {col.deals.map((deal, index) => (
                <Card key={index} sx={{ mt: 1 }}>
                  <CardContent>
                    <Typography>{deal.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{deal.amount}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
