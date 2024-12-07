document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("sushi-calculator");
    const totalWeightDisplay = document.getElementById("total-weight");
    const cupQuotientDisplay = document.getElementById("cup-quotient");
    const cupRemainderDisplay = document.getElementById("cup-remainder");
  
    function calculateSums() {
      const rows = table.querySelectorAll("tbody tr:not(#column-sum-row)");
      const columnTotals = Array(10).fill(0); // 가로 10칸
      let overallTotal = 0;
  
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        let rowSum = 0;
  
        for (let i = 1; i <= 8; i++) { // 2~9번째 열의 합 계산
          const value = parseFloat(cells[i].textContent) || 0;
          columnTotals[i] += value;
          rowSum += value;
        }
  
        cells[9].textContent = `${rowSum}g`; // 행 합계 (맨 마지막 칸)
      });
  
      const totalCells = table.querySelectorAll("#column-sum-row td");
      totalCells[0].textContent = "합계"; // 첫 번째 칸에 "합계" 표시
  
      for (let i = 1; i <= 8; i++) {
        totalCells[i].textContent = `${columnTotals[i]}g`; // 열 합계
        overallTotal += columnTotals[i];
      }
  
      totalCells[9].textContent = `${overallTotal}g`; // 전체 합계
      totalWeightDisplay.textContent = `${overallTotal}g`; // 총 밥량 업데이트
  
      // 컵 계산
      const quotient = Math.floor(overallTotal / 750);
      const remainder = overallTotal % 750;
  
      cupQuotientDisplay.textContent = quotient;
      cupRemainderDisplay.textContent = `${remainder}g`;
    }
  
    table.addEventListener("input", calculateSums);
  });
  