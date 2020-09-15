### Task Description

Create a 50x50 grid.
Whenever you click on a cell in this grid, 1 is added to all cells in the same row and column.
If a cell was empty, set it to 1.
Every change to a cell should cause the cell to briefly light up yellow.
If at least 5 successive numbers in the cells form a part of a Fibonacci sequence, shortly light these cells up green and then empty these cells.

### Running the solution

Open `grid.html` in your browser and click on the cells!

### Approach

I'm sure there is a more backend way to do this but I thought doing it all on the frontend would give the most simple/lightweight solution.  
I broke the problem down into very small pieces and solved one part at a time. Starting with making a grid, making the grid do something on click, adding 1 to cells in same row, adding 1 to cells in same columns etc.  
The final step of checking if cells formed part of a Fibonnaci sequence took me by far the longest.  
Once I had finished all the steps I did some refactoring; mostly splitting it up into functions to make it more readable and avoid repetition.

### Limitations and Issues

The biggest limitation of my solution is that it only works for sequences of 5 values. The task asked for **at least** 5 but I couldnt think of a good way to do that based on the approach I had taken.

There are some other minor points which could be improved:

- Fibonnaci numbers are hard coded - would have been nice to do something smarter where a function actually calculates whether a given array of numbers forms the sequence
- Sequences continue across the start/end of rows/columns - not necessarily incorrect. Could avoid this by having array of arrays of cells in row/column but I think it's fine how it is
- I have an unused variable on line 54 but I couldnt get it to work with a regular for loop (not sure why)
- Also have an error in the console about c on line 59 being undefined but I cannot work out why
- Question mark over the performance/efficiency
- There are no specs!
